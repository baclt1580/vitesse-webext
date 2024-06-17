import { Translator } from "../interface/Translator.interface";

abstract class AbstractTranslator implements Translator{
    translate(str: string): string {
        throw new Error("Method not implemented.");
    }
    
}