#!/bin/bash
npm run typeorm schema:drop
npm run typeorm schema:sync
npm run seed
npm run dev