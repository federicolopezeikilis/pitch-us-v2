const { connect, disconnect } = require('mongoose')
const { User } = require('../models')
const { AuthError } = require('errors')
const { authenticateOrRegisterUser } = require('./')
const { expect } = require('chai')

describe('authenticateOrRegisterUser', () => {
    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        await User.deleteMany()

        await Promise.all([
            await User.create({ username: 'Pepito Grillo', email: 'pepigri@gmail.com', provider: { name: 'google', providerId: '12345678' } }),
            await User.create({ username: 'Pepito Grillo1', email: 'pepitogrillo@gmail.com', provider: { name: 'google', providerId: '12345679' } }),
            await User.create({ username: 'wendy', email: 'wendy@gmail.com', password: 'Passw0rd'})
        ])
    })

    it('succeeds on correct data', async () => {
        const result = await authenticateOrRegisterUser({ username: 'peterpan', email: 'peterpan@gmail.com', providerName: 'google', providerId: '987654321' })

        expect(result).not.to.be.undefined

        const user = await User.findOne({ username: 'peterpan' })

        expect(user.username).to.equal('peterpan')
        expect(user.email).to.equal('peterpan@gmail.com')
        expect(user.provider.name).to.equal('google')
        expect(user.provider.providerId).to.equal('987654321')
    })

    it('succeeds changing username when username already exists', async () => {
        const result = await authenticateOrRegisterUser({ username: 'Pepito Grillo', email: 'pepito@gmail.com', providerName: 'google', providerId: '456456456' })

        expect(result).not.to.be.undefined

        const user = await User.findOne({ 'provider.name': 'google', 'provider.providerId': '456456456' })

        expect(user.username).to.equal('Pepito Grillo2')
        expect(user.email).to.equal('pepito@gmail.com')
        expect(user.provider.name).to.equal('google')
        expect(user.provider.providerId).to.equal('456456456')
    })

    it('fails when email is already registerd with other provider', async () => {
        try {
            await authenticateOrRegisterUser({ username: 'Pepito Grillo', email: 'pepigri@gmail.com', providerName: 'facebook', providerId: '12345987' })

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('email already registered with other provider')
        }
    })

    it('fails on wrong providerId', async () => {
        try {
            await authenticateOrRegisterUser({ username: 'Pepito Grillo', email: 'pepigri@gmail.com', providerName: 'google', providerId: '12345987' })

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('providerId does not match')
        }
    })

    it('fails when email is already registerd with credentials', async () => {
        try {
            await authenticateOrRegisterUser({ username: 'wen', email: 'wendy@gmail.com', providerName: 'google', providerId: '19731973' })

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('email already registered with other provider')
        }
    })

    it('fails email does not match with provider information', async () => {
        try {
            await authenticateOrRegisterUser({ username: 'Pepito', email: 'pepa@gmail.com', providerName: 'google', providerId: '12345678' })

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('email does not match with provider information')
        }
    })

    afterEach(async () => await User.deleteMany())

    after(() => disconnect())
})