import React from 'react';
import { RichTextField } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { HydraAdmin, hydraClient, fetchHydra as baseFetchHydra } from '@api-platform/admin';
import authProvider from './authProvider';
import parseHydraDocumentation from '@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation';
import { Route, Redirect } from 'react-router-dom';


const entrypoint = 'http://www.apisyfea.local';

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

const fetchHeaders = {'Authorization': `Bearer ${localStorage.getItem('token')}`};
const fetchHydra = (url, options = {}) => baseFetchHydra(url, {
    ...options,
    headers: new Headers(fetchHeaders),
});
const dataProvider = api => hydraClient(api, fetchHydra);
const apiDocumentationParser = entrypoint =>
    parseHydraDocumentation(entrypoint, {
        headers: new Headers(fetchHeaders),
    }).then(
        ({ api }) => ({ api }),
        result => {
            const { api, status } = result;

            if (status === 401) {
                return Promise.resolve({
                    api,
                    status,
                    customRoutes: [
                        <Route path="/" render={() => <Redirect to="/login" />} />,
                    ],
                });
            }

            return Promise.reject(result);
        }
    );

export default (props) => <HydraAdmin apiDocumentationParser={myApiDocumentationParser} entrypoint={entrypoint} authProvider={authProvider} dataProvider={dataProvider}/>;