const { connect, disconnect, isValidObjectId } = require('mongoose')
const { User } = require('../models')
const { AuthError } = require('errors')
const { authenticateUser } = require('./')
const { expect } = require('chai')
const bcrypt = require('bcryptjs')

describe('authenticateUser', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    describe('when user already exists', () => {
        let user

        beforeEach(async () => {
            const hash = await bcrypt.hash('Passw0rd', 10)

            user = new User({ email: 'papagayo@gmail.com', username: 'papagayo', password: hash })

            await user.save()
        })

        it('succeeds on correct credentials', async () => {
            const userId = await authenticateUser('papagayo@gmail.com', 'Passw0rd')

            expect(userId).to.be.a('string')
            expect(isValidObjectId(userId)).to.be.true
            expect(userId).to.equal(user.id)
        })

        it('fails on incorrect password', async () => {
            try {
                await authenticateUser('papagayo@gmail.com', 'Passw0rd-wrong')

                throw new Error('should not reach this point')

            } catch (error) {
                expect(error).to.be.instanceOf(AuthError)
                expect(error.message).to.equal('wrong credentials')
            }
        })

        it('fails on incorrect username', async () => {
            try {
                await authenticateUser('papagayo-wrong@gmail.com', 'Passw0rd')

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(AuthError)
                expect(error.message).to.equal('wrong credentials')
            }
        })
    })

    describe('when user does not exist', () => {
        it('fails on credentials from non-existing user', async () => {
            try {
                await authenticateUser('papagayo@example.com', 'Passw0rd')
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(AuthError)
                expect(error.message).to.equal('wrong credentials')
            }
        })
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())

})