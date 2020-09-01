/**
 * @param {number} OK
 * @param {number} Created
 * @param {number} NoContent
 * @param {number} BadRequest
 * @param {number} Unauthorized
 * @param {number} Forbidden
 * @param {number} NotFound
 * @param {number} Conflict
 * @param {number} InternalServerError
 */
export class Constants {  
	// RESPONSE ERROR CODES
	static get OK()						{ return 200 }
	static get Created()				{ return 201 }
	static get NoContent()				{ return 204 }
	static get BadRequest()				{ return 400 }
	static get Unauthorized()			{ return 401 }
	static get Forbiden()				{ return 403 }
	static get NotFound()				{ return 404 }
	static get Conflict()				{ return 409 }
	static get InternalServerError()	{ return 500 }
	static get NetworkReadTimeoutError(){ return 598 }

	// API CODES
	static get successCode()        { return 0 }
	static get errorCodeSequelize() { return 1 }
	static get errorCodeAuth()      { return 2 }
}

