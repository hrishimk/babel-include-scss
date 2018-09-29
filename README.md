# babel-include-scss
Babel plugin to include sass (.scss) files as string

    //index.js
    let a = include_scss('./test.scss');

    //test.scss
    .style {
        color: red;
    }

    //output
    let a = ".style{color:red}";