const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = Schema({
    project: {type: String, required: true},
    issue_title: {type: String, required: true},
    issue_text: {type: String, required: true},
    created_by: {type: String, required: true},
    assigned_to: String,
    open: {type: Boolean, default: true, required: true},
    status_text: String
}, {timestamps: {createdAt: 'created_on', updatedAt: 'updated_on'}});

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;