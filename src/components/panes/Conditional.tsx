import { h } from "preact";
import { MenuTemplate } from "../../classes/MenuTemplate";
import { IMenuItemRenderer, IMenuTemplate } from "../SideBar";

export interface IConditionalMenuItemOptions {
    item: MenuTemplate
    condition: () => boolean
}

export const ConditionalMenuItem: IMenuItemRenderer = (item: IMenuTemplate<void, IConditionalMenuItemOptions>) => {
    if (item.options.condition()) return item.options.item.type(item.options.item)
    else return <p style="display: none;"></p>
}

export class Conditional extends MenuTemplate<void, IConditionalMenuItemOptions> {
    public type = ConditionalMenuItem;
    public conditional = true;
    public label: string;
    public options: IConditionalMenuItemOptions;
    public getter?: () => undefined;
    public setter?: undefined;

    constructor(label: string, options: IConditionalMenuItemOptions) {
        super();
        this.label = label;
        this.options = options;
    }
}
