// Setting up dependencies
const router = require("express").Router();
const db = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");