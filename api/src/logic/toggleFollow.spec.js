const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { NotFoundError, ConflictError } = require('errors')
const { User } = require('../models')
const { expect } = require('chai')
const { toggleFollow } = require('.')

describe('toggleFollow', () => {
    let wendyUser, pepitoUser

    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        await User.deleteMany()

        wendyUser = await User.create({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })

        pepitoUser = await User.create({ username: 'pepito', email: 'pepitogrillo@gmail.com', password: 'Passw0rd' })
    })

    it('succeed on existing users that do not follow each other', async () => {
        const result = await toggleFollow(pepitoUser._id.toString(), wendyUser._id.toString())

        expect(result).to.be.undefined

        const wendy = await User.findById(wendyUser._id)

        const pepito = await User.findById(pepitoUser._id)

        expect(pepito.following).to.have.lengthOf(1)
        expect(pepito.followers).to.have.lengthOf(0)
        expect(pepito.following[0].toString()).to.equal(wendyUser._id.toString())

        expect(wendy.following).to.have.lengthOf(0)
        expect(wendy.followers).to.have.lengthOf(1)
        expect(wendy.followers[0].toString()).to.equal(pepitoUser._id.toString())
    })

    it('succeed on existing users that has a previous follow', async () => {
        pepitoUser.following.push(wendyUser._id)
        wendyUser.followers.push(pepitoUser._id)

        await pepitoUser.save()
        await wendyUser.save()

        
        const result = await toggleFollow(pepitoUser._id.toString(), wendyUser._id.toString())
        
        expect(result).to.be.undefined

        const wendy = await User.findById(wendyUser._id)

        const pepito = await User.findById(pepitoUser._id)

        expect(pepito.following).to.have.lengthOf(0)
        expect(pepito.followers).to.have.lengthOf(0)

        expect(wendy.following).to.have.lengthOf(0)
        expect(wendy.followers).to.have.lengthOf(0)
    })

    it('fails on unexisting user to follow', async () => {
        const wrongUserId = new ObjectId().toString()

        try {
            await toggleFollow(pepitoUser._id.toString(), wrongUserId)

            throw new Error('it should not reach this point')

        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user to follow with id ${wrongUserId} not found`)
        }

        expect(pepitoUser.following).to.have.lengthOf(0)
    })

    it('fails on unexisting user', async () => {
        const wrongUserId = new ObjectId().toString()

        try {
            await toggleFollow(wrongUserId, wendyUser._id.toString())

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${wrongUserId} not found`)
        }
    })

    it('fails on same user as follower and following', async () => {
        try {
            await toggleFollow(pepitoUser._id.toString(), pepitoUser._id.toString())

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ConflictError)
            expect(error.message).to.equal('user cannot follow themself')
        }
    })
    
    afterEach(() => User.deleteMany())

    after(() => disconnect())
})