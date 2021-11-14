'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

  }
  /**
   *
   * @returns {T[]}
   */
  static get dates() {
    return super.dates.concat(['created_at','updated_at'])
  }

  /**
   *
   * @param field
   * @param value
   * @returns {*}
   */
  static castDates(field, value) {
    if (field === 'created_at') {
      return value.format('Y-MM-D HH:mm:ss')
    }
    if (field === 'updated_at') {
      return value.format('Y-MM-D HH:mm:ss')
    }
  }
  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
