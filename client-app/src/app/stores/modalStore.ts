import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

export default class ModalStore {
    rootStore: RootStore

    constructor(rootStore: RootStore){
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    //Observables
    modal = {
        open: false,
        body: null
    }

    //actions
    openModel = (content: any) => {
        this.modal.open = true;
        //going to be your component e.g. login
        this.modal.body = content;
    }

    closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
}
