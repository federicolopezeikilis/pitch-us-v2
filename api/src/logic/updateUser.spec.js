const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User } = require('../models')
const { NotFoundError } = require('errors')
const { updateUser } = require('./')
const { expect } = require('chai')

describe('updateUser', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    describe('when user already exists', () => {
        let user

        beforeEach(async () => {
            user = new User({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })

            await user.save()
        })

        it('succeeds on correct user data', async () => {
            const result = await updateUser({ userId: user.id, firstName: 'Wendy', lastName: 'Pan', dateOfBirth: new Date('1988-01-01') })

            expect(result).to.be.undefined

            const testUser = await User.findById(user.id)

            expect(testUser.firstName).to.equal('Wendy')
            expect(testUser.lastName).to.equal('Pan')
        })

        it('fails on incorrect user id', async () => {
            const wrongUserId = new ObjectId().toString()

            try {
                await updateUser({ userId: wrongUserId, firstName: 'Wendy', lastName: 'Pan', dateOfBirth: new Date('1988-01-01') })

                throw new Error('should not reach this point')

            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user with id ${wrongUserId} not found`)
            }
        })
    })

    describe('when user does not exist', () => {
        it('fails on unexisting user id', async () => {
            const wrongUserId = new ObjectId().toString()

            try {
                await updateUser({ userId: wrongUserId, firstName: 'Wendy', lastName: 'Pan', dateOfBirth: new Date('1988-01-01') })

                throw new Error('should not reach this point')

            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user with id ${wrongUserId} not found`)
            }
        })
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})