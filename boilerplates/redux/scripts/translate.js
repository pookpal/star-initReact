/**
 * Created by lijie on 16/7/18.
 */

import * as fs from 'fs';
import {sync as globSync} from 'glob';
import {sync as mkdirpSync} from 'mkdirp';

const MESSAGES_PATTERN = './src/temp/i18n-messages/**/*.json';
const LANG_PATTERN = './src/locale/*.js';
const LANG_DIR = './src/locale/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
const defaultMessages = globSync(MESSAGES_PATTERN)
    .map((filename) => fs.readFileSync(filename, 'utf8'))
    .map((file) => JSON.parse(file))
    .reduce((collection, descriptors) => {
        descriptors.forEach(({id, defaultMessage}) => {
            if (collection.hasOwnProperty(id)) {
                throw new Error(`Duplicate message id: ${id}`);
            }

            collection[id] = defaultMessage;
        });

        return collection;
    }, {});

// ��ȡĿǰϵͳ�е����԰�
const originLangs = {
    zh: {},
    en: {},
};
globSync(LANG_PATTERN)
    .map((filename) => {
        originLangs[filename.split('/').pop().split('.').shift()] = require('../' + filename);
    });

// �������԰�
// �Ա�������� key Ϊ׼����Ĭ������Ϊ�������԰�
const defaultMessagesArr = Object.keys(defaultMessages).map((id) => [id, defaultMessages[id]]);
const newLangs = {};
newLangs.zh = defaultMessages;
newLangs.en = defaultMessagesArr.reduce((collection, [id]) => {
    collection[id] = originLangs.en[id] || '';
    return collection;
}, {});

mkdirpSync(LANG_DIR);

fs.writeFileSync(LANG_DIR + 'en.js',
    `module.exports = ` +
    JSON.stringify(newLangs.en, null, 2)
);

fs.writeFileSync(LANG_DIR + 'zh.js',
    `// ���ļ��ɽű��Զ����ɣ������޸�\n
module.exports = ` +
    JSON.stringify(newLangs.zh, null, 2)
);