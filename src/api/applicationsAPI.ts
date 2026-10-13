import type { Application } from "../types";

const KEY = "job-applied"; // usually it can be a JWT-token
//
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

//it gets the applications from local storage
export async function getApplications(): Promise<Application[]> {
  //it pauses the getApplications function for 300 milliseconds
  await delay();
  const raw = localStorage.getItem(KEY);
  // if there is data in the local storage, it parses the JSON string back into a JavaScript
  // object and tells TypeScript to treat it as an array of Application[]
  // else if there is no data in the storage, it returns an empty array
  return raw ? (JSON.parse(raw) as Application[]) : [];
}
//it saves the applications to local storage
export async function saveApplications(apps: Application[]): Promise<void> {
  await delay();
  //it converts the applications array into a JSON string and
  //saves it to local storage under the key "job-applied"
  localStorage.setItem(KEY, JSON.stringify(apps));
}
