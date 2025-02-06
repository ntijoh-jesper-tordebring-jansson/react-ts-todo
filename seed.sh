#!/bin/sh

# Create the database and setup the tables
npm run db:migrate --workspace=backend

# Seed the database
npm run db:seed --workspace=backend
