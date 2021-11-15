'use strict';
const User = use('App/Models/User');

/**
 * AuthController
 */
class AuthController {
    /**
     * authenticate Jwt
     * @param request
     * @param response
     * @param auth
     * @returns {void|*|{limit, strict, types}}
     */
    async authenticate({request, response, auth}) {
        const {email, password} = request.all();
        const token = await auth.attempt(email, password);
        return response.json(token);
    }

    /**
     * authenticate Jwt
     * @param response
     * @param auth
     * @returns auth {void|*|{limit, strict, types}}
     */
    async userAuthenticate({response, auth}) {
        return response.json(await auth.getUser())
    }

    /**
     * revokeToken
     * @param response
     * @param auth
     */
    async revokeToken({response, auth}) {
        const apiToken = auth.getAuthHeader();
        await auth.authenticator('jwt').revokeTokens([apiToken]);
        return response.json({error: false, message: 'user unauthenticated'});
    }

    /**
     * revokeAllTokens
     * @param response
     * @param auth
     * @returns {*|{limit, strict, types}|void}
     */
    async revokeAllTokens({response, auth}) {
        await auth.authenticator('jwt').revokeTokens();
        return response.json({error: false, message: 'all users unauthenticated'});
    }

    /**
     * logout
     * @param response
     * @param auth
     */
    async logout({response, auth}) {
        const user = await auth.getUser();
        try {
            await auth.authenticator('jwt').revokeTokensForUser(user);
            return response.json({error: false, message: 'user unauthenticated'});
        } catch (error) {
            return response.json({error: false, message: 'unauthenticated'});
        }
    }

    /**
     *
     * @param request
     * @param response
     * @param auth
     * @returns {Promise<Boolean|*>}
     */
    async create({ request, response, auth}) {
        try {            
            const email = request.input("email")
            const password = request.input("password")
            const name = request.input("name")
      
            const userExists = await User.findBy('email', email)
            if (userExists) {
                return response.status(400).send({
                    status: 'error',
                    message: 'User already registered'
                })
            }

            let user = new User()
            user.email = email
            user.password = password
            user.fname = name

            let success = await user.save()
            let token  = await auth.attempt(email, password);
   
            return response.status(201).json({
                status: 'ok',
                message: 'User is registered',
                success: success,
                UserID: user['_id'],
                token: token
            })    
        } catch (error) {
            console.log(error.message)
            response.status(403).json({
                status: 'error',
                debug_error: error.message,
            })
        }
    }


    /**
     *
     * @param request
     * @param response
     * @returns {*}
     */
    async delete({request, response}) {
        const {id} = request.all();
        const user = await User.find(id);
        await user.delete();
        return response.json({success: true, message: 'Usuário removido'})
    }

    /**
     *
     * @param request
     * @param response
     * @returns {*}
     */
    async updateUser({request, response}) {
        const user = await User.find(request.all().id);
        if (user) {
            if (request.all().username === user.email) {
                user.merge({username: request.all().username, email: request.all().email});
            } else {
                user.merge({
                    username: request.all().username,
                    email: request.all().email,
                    password: request.all().password
                });
            }
            await user.save();
            return response.json(user)
        }
        return response.json({error: true, message: "Usuário não existe"})
    }

}

module.exports = AuthController;
