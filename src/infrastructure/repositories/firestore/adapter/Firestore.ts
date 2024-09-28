import 'reflect-metadata';
import { Firestore } from '@google-cloud/firestore';
import { GCP_PROJECT } from '@util';

export const firestore = new Firestore({ projectId: GCP_PROJECT });
