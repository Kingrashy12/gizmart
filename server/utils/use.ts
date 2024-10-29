import { Request, Response } from "express";

type RequestAction = {
  action: (req: Request, res: Response) => Promise<any>;
};

/** A function that takes a request action and returns the action
 * @param {RequestAction} action
 * @returns {Promise<any>}
 */
const useRequest = ({ action }: RequestAction) => action;

export { useRequest };
