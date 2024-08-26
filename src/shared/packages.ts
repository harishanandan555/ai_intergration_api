const Busboy = require('busboy');
const axios = require('axios');
const fs = require('fs');
const os = require('os');
const html_to_pdf = require('html-pdf-node');
const pdfLib = require('pdf-lib');
const { Readable } = require('stream');
const { AWS } = require('aws-sdk');

module.exports = {
    Busboy,
    axios,
    fs,
    os,
    html_to_pdf,
    pdfLib,
    Readable,
    AWS
};