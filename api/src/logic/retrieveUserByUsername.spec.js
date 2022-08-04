const { connect, disconnect } = require('mongoose')
const { User } = require('../models')
const { NotFoundError } = require('errors')
const { retrieveUserByUsername } = require('./')
const { expect } = require('chai')

describe('retrieveUserByUsername', () => {
    let user

    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        await User.deleteMany()

        user = await User.create({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })
        await User.create({ username: 'peterpan', email: 'peterpan@gmail.com', password: 'Passw0rd' })
        await User.create({ username: 'johndoe', email: 'johndoe@gmail.com', password: 'Passw0rd' })
    })

    it('succeeds on existing username', async () => {
        const result = await retrieveUserByUsername(user.username)

        expect(result).to.be.instanceOf(Object)

        expect(result.username).to.equal(user.username)
        expect(result.following).to.be.instanceOf(Array)
        expect(result.followers).to.be.instanceOf(Array)
        expect(result.id).to.be.string
        expect(result.email).to.be.undefined
        expect(result.password).to.be.undefined
        expect(result.__v).to.be.undefined
        expect(result._id).to.be.undefined
    })

    it('fails on non existing user', async () => {
        try {
            await retrieveUserByUsername('NonExistingUser')

            throw new Error('it should not reach this point')

        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with username NonExistingUser not found`)
        }
    })
    afterEach(() => User.deleteMany())

    after(() => disconnect())
})