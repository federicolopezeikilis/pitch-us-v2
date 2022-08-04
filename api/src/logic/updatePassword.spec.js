const { expect } = require('chai')
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { AuthError, NotFoundError } = require('errors')
const { User } = require('../models')
const { updatePassword } = require('./')
const bcrypt = require('bcryptjs')

describe('updatePassword', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    describe('on existing user', () => {
        let user

        beforeEach(async () => {
            const hash = await bcrypt.hash('Passw0rd', 10)

            user = User({ username: 'wendypan', email: 'wendypan@gmail.com', password: hash })

            await user.save()
        })

        it('succeeds on correct password and token', async () => {
            await updatePassword(user.id, 'Passw0rd', 'newPassw0rd')

            const userFounded = await User.findById(user.id)

            expect(bcrypt.compareSync('newPassw0rd', userFounded.password)).to.be.true
        })

        it('fails on incorrect password and correct token', async () => {
            try {
                await updatePassword(user.id, 'Wr0ngPass', 'newPassw0rd')

                throw new Error('it should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(AuthError)
                expect(error.message).to.equal('wrong credentials')
            }
        })

        it('fails on incorrect token and correct password', async () => {
            const wrongUserId = new ObjectId().toString()

            try {
                await updatePassword(wrongUserId, 'Passw0rd', 'newPassw0rd')

                throw new Error('it should not reach this point')

            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user with id ${wrongUserId} not found`)
            }
        })
    })

    describe('on unexisting user', () => {
        it('fails on incorrect token and password', async () => {
            const wrongUserId = new ObjectId().toString()

            try {
                await updatePassword(wrongUserId, 'wrong-Passw0rd', 'newPassw0rd')
                throw new Error('it should not reach this point')

            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user with id ${wrongUserId} not found`)
            }
        })
    })
    afterEach(() => User.deleteMany())

    after(() => disconnect())
})