import { h } from "preact";
import { MenuTemplate } from "../../classes/MenuTemplate";
import { IMenuItemRenderer, IMenuTemplate } from "../SideBar";

export interface ITextMenuItemOptions {
    defaultValue?: string
    placeHolder?: string
}

export const TextMenuItem: IMenuItemRenderer = (item: IMenuTemplate<string, ITextMenuItemOptions>) => {
    return <div class="form-group-item">
        {
            (item.label !== "") ? <label>{item.label}</label> : null
        }
        <input
            class="form-control"
            type="text"
            placeholder={item.options.placeHolder ?? "Insert text here…"}
            value={
                (() => {
                    let ret = "";
                    if (item.getter) {
                        const moddefault = item.getter();
                        if (item.options.defaultValue && item.options.defaultValue === moddefault) return "";
                        if (item.options.placeHolder && item.options.placeHolder === moddefault) return "";
                        ret = moddefault;
                    } else if (item.options.defaultValue) {
                        ret = item.options.defaultValue;
                    }

                    return ret
                })()
            }
            onInput={(e: Event) => {
                const target = e.target as HTMLInputElement
                
                if (item.setter && target.value) {
                    item.setter(target.value);
                }
            }}
            ></input>
    </div>
}

export class Text extends MenuTemplate<string, ITextMenuItemOptions> {
    public type = TextMenuItem;
    public label: string;
    public options: ITextMenuItemOptions;
    public getter: () => string;
    public setter: (arg: string) => void;

    constructor(label: string, options: ITextMenuItemOptions, getter: () => string, setter: (arg: string) => void) {
        super();
        this.label = label;
        this.options = options;
        this.getter = getter;
        this.setter = setter;
    }
}