import BaseModal from "../BaseModal";
import { basename } from "path";

export default class ModalNewTask extends BaseModal {
  constructor() {
    super(basename(__dirname));
  }
}

