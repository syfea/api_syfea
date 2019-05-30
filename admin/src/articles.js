import React from 'react';
import { RichTextField } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { HydraAdmin } from '@api-platform/admin';
import parseHydraDocumentation from '@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation';

//const entrypoint = 'http://www.apisyfea.local';

const myApiDocumentationParser = entrypoint => parseHydraDocumentation(entrypoint)
    .then( ({ api }) => {
        const articles = api.resources.find(({ name }) => 'articles' === name);
        const content = articles.fields.find(f => 'content' === f.name);

        content.field = props => (
            <RichTextField {...props} source="content" />
    );

        content.input = props => (
            <RichTextInput {...props} source="content" />
    );

        content.input.defaultProps = {
            addField: true,
            addLabel: true
        };

        return { api };
    })
;

export default (props) => <HydraAdmin apiDocumentationParser={myApiDocumentationParser} entrypoint={entrypoint}/>;