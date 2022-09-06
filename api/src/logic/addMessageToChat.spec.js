const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Chat } = require('../models')
const { NotFoundError, ConflictError } = require('errors')
const { addMessageToChat } = require('./')
const { expect } = require('chai')

describe('addMessageToChat', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    describe('when users already exist', () => {
        let user1, user2

        beforeEach(async () => {
            user1 = new User({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })
            user2 = new User({ username: 'pepigri', email: 'pepitogrillo@gmail.com', password: 'Passw0rd' })

            await Promise.all([user1.save(), user2.save()])
        })

        describe('on users that follow to each other', () => {
            beforeEach(async () => {
                const [user1Founded, user2Founded] = await Promise.all([User.findById(user1.id), User.findById(user2.id)])

                user1Founded.following.push(user2Founded._id)
                user1Founded.followers.push(user2Founded._id)
                user2Founded.following.push(user1Founded._id)
                user2Founded.followers.push(user1Founded._id)

                await Promise.all([user1Founded.save(), user2Founded.save()])
            })

            it('creates a new chat the first time', async () => {
                const result = await addMessageToChat(user1._id.toString(), user2._id.toString(), 'hola pepito')

                expect(result).to.be.undefined

                const chat = await Chat.findOne({ users: { $all: [user1._id, user2._id] } })

                expect(chat.users[0].toString()).to.equal(user1._id.toString())
                expect(chat.users[1].toString()).to.equal(user2._id.toString())
                expect(chat.messages).to.have.lengthOf(1)
                expect(chat.messages[0].user.toString()).to.equal(user1._id.toString())
                expect(chat.messages[0].text).to.equal('hola pepito')
            })

            it('adds a new message to an existing chat', async () => {
                const chat = await Chat.create({ users: [user1._id.toString(), user2._id.toString()], messages: [{ user: user1._id.toString(), text: 'hola pepito' }] })

                await addMessageToChat(user2._id.toString(), user1._id.toString(), 'hello wendy!')

                const chatFounded = await Chat.findById(chat._id)

                expect(chatFounded.users[0].toString()).to.equal(user1._id.toString())
                expect(chatFounded.users[1].toString()).to.equal(user2._id.toString())
                expect(chatFounded.messages).to.have.lengthOf(2)
                expect(chatFounded.messages[0].user.toString()).to.equal(user1._id.toString())
                expect(chatFounded.messages[0].text).to.equal('hola pepito')
                expect(chatFounded.messages[1].user.toString()).to.equal(user2._id.toString())
                expect(chatFounded.messages[1].text).to.equal('hello wendy!')
            })
        })

        it('fails on users that do not follow each other', async () => {
            try {
                await addMessageToChat(user2._id.toString(), user1._id.toString(), 'hello wendy!')

                throw new Error('it should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(ConflictError)
                expect(error.message).to.equal(`user with id ${user2._id.toString()} does not follow user with id ${user1._id.toString()}`)

            }
        })

        it('fails on unexisting user who sends the message', async () => {
            const wrongUserId = (new ObjectId).toString()

            try {
                await addMessageToChat(wrongUserId, user1._id.toString(), 'hello')

                throw new Error('it should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user who sends the message with id ${wrongUserId} not found`)
            }
        })

        it('fails on unexisting user who receives the message', async () => {
            const wrongUserId = (new ObjectId).toString()

            try {
                await addMessageToChat(user1._id.toString(), wrongUserId, 'hello')

                throw new Error('it should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user who receives the message with id ${wrongUserId} not found`)
            }
        })

    })

    afterEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    after(() => disconnect())
})