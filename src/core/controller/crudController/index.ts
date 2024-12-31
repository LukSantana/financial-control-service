import {
  TOperationGeneric
} from "./types";
import { Controller } from "..";
import { type TCrudOperations } from "../types";

export abstract class CrudController extends Controller<TCrudOperations> {
  protected abstract fetchMany: TOperationGeneric;
  protected abstract fetchUnique: TOperationGeneric;
  protected abstract create: TOperationGeneric;
  protected abstract update: TOperationGeneric;
  protected abstract delete: TOperationGeneric;
}