import { Component, createRef, h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import Delta from "quill-delta";
import { IMenuItemRenderer, IMenuTemplate } from "../SideBar";
import { MenuTemplate } from "../../classes/MenuTemplate";
import Quill from "quill";

export const RichTextMenuItem: IMenuItemRenderer = (item: IMenuTemplate<Delta, undefined>) => {

    class RichText extends Component {
        ref = createRef<HTMLDivElement>();
        quill: Quill | undefined;

        render() {

            return <div>
                {
                    (item.label !== "") ? <label>{item.label}</label> : null
                }
                <div ref={this.ref}></div>
            </div>
        }

        componentDidMount() {
            var toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                // [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']                                         // remove formatting button
            ];


            if (this.ref != null && this.ref.current != null) {
                this.quill = new Quill(this.ref.current, {
                    theme: 'snow',
                    modules: {
                        toolbar: toolbarOptions
                    }
                });

                var container = this.quill.addContainer('ql-custom');

                if (this.quill) {
                    if (item.getter !== undefined) {
                        this.quill?.setContents(item.getter());
                    }

                    this.quill?.on('text-change', () => {
                        console.log(this.quill?.getContents());
                        if (item.setter !== undefined && this.quill !== undefined) {
                            item.setter(this.quill.getContents())
                        }
                    });
                }
            }
        }

        componentWillUnmount() {
            if (this.ref && this.ref.current) this.ref.current.remove();
        }
    }


    // useEffect(() => {


    //         // (async () => {
    //         //     import("quill").then((Quill) => {

    //         //     });                
    //         // })();
    //     }
    // });

    return <RichText />;
}

export class RichText extends MenuTemplate<Delta, undefined> {
    public type = RichTextMenuItem;
    public label: string;
    public options: undefined;
    public getter: (() => Delta);
    public setter: ((arg: Delta) => void);

    constructor(label: string, getter: () => Delta, setter: (arg: Delta) => void) {
        super();
        this.label = label;
        this.getter = getter;
        this.setter = setter;
    }
}
