import {atom} from "recoil";

const initialState = {
    probList: ["hi","hi2"],
};

export const probState = atom({
    key: "prob",
    default: ["노란색","빨간색","파란색"],
});
