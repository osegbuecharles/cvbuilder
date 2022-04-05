import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function Editor(props){
    const handleChange=(val)=>{
        props.editor(val);
    }
    
    return (
        <CKEditor
            editor={ ClassicEditor }
            data={props.default?props.default:" "}
            onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                //console.log( 'Editor is ready to use!', editor );
                sessionStorage.setItem("others",editor.getData());
            } }
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                sessionStorage.setItem("others",data);
                //handleChange(data);

                //console.log( { event, editor, data } );
            } }
            onBlur={ ( event, editor ) => {
                //console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
               // console.log( 'Focus.', editor );
            } }
        />
    )
}



export default Editor;