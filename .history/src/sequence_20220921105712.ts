// ---------- ADD IMPORTS -------------
import {
  AuthenticateFn,
  AuthenticationBindings,
  AUTHENTICATION_STRATEGY_NOT_FOUND,
  USER_PROFILE_NOT_FOUND,
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SequenceHandler, RequestContext, Request, Response} from '@loopback/rest';
import {ParamsDictionary} from 'express-serve-static-core';
import {ParsedQs} from 'qs';
// ------------------------------------
export class MySequence implements SequenceHandler {
  constructor(
    // ---- ADD THIS LINE ------
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,
  ) {}
  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);
      // - enable jwt auth -
      // call authentication action
      // ---------- ADD THIS LINE -------------
      await this.authenticateRequest(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      // ---------- ADD THIS SNIPPET -------------
      // if error is coming from the JWT authentication extension
      // make the statusCode 401
      if (
        err.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
        err.code === USER_PROFILE_NOT_FOUND
      ) {
        Object.assign(err, {statusCode: 401 /* Unauthorized */});
      }
      // ---------- END OF SNIPPET -------------
      this.reject(context, err);
    }
  }
  reject(context: RequestContext, err: any) {
    throw new Error('Method not implemented.');
  }
  send(response: Response<any, Record<string, any>>, result: void) {
    throw new Error('Method not implemented.');
  }
  invoke(route: void, args: void) {
    throw new Error('Method not implemented.');
  }
  parseParams(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, route: void) {
    throw new Error('Method not implemented.');
  }
  findRoute(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    throw new Error('Method not implemented.');
  }
}
