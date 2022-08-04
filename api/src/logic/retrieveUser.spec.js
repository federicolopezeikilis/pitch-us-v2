const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User } = require('../models')
const { NotFoundError } = require('errors')
const { retrieveUser } = require('./')
const { expect } = require('chai')

describe('retrieveUser', () => {
    let user

    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        await User.deleteMany()

        user = await User.create({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })
    })

    it('succeeds on correct credentials', async () => {
        const result = await retrieveUser(user.id.toString())

        expect(result).to.be.instanceOf(Object)

        expect(result.username).to.equal('wendypan')
        expect(result.email).to.equal('wendypan@gmail.com')
        expect(result.password).to.be.undefined
        expect(result.__v).to.be.undefined
        expect(result._id).to.be.undefined
    })

    it('fails on wrong credentials', async () => {
        const wrongUserId = new ObjectId().toString()
        try {
            await retrieveUser(wrongUserId)

            throw new Error('it should not reach this point')

        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${wrongUserId} not found`)
        }
    })
    afterEach(() => User.deleteMany())

    after(() => disconnect())
})