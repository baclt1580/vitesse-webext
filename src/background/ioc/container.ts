import { container } from "tsyringe";
import { AbstranctTranslator } from "../translator/Translate.abstract";
import { GPTTranslator } from "../translator/GPTTranslator";

export function initContainer(){
    container.register("translator",{useValue:new GPTTranslator()})
  
}