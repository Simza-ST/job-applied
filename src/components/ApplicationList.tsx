import { Link } from "react-router-dom";
import type { Application } from "../types";
import { ApplicationCard } from "./ApplicationCard";

// Declares a type for the props that the ApplicationList component will receive.
// It expects an object with a single property applications of type Application[].
type ApplicationListProps = {
  applications: Application[];
};

// The ApplicationList component receives an applications prop of type Application[]
// and renders a list of ApplicationCard components for each application in the array.
// If there are no applications, it displays a message indicating that no applications
// were found and you can add new ones.
export function ApplicationList({ applications }: ApplicationListProps) {
  if (applications.length === 0){
    return <p className="text-sm text-gray-500">
      No applications found. Please add some applications 
      <Link to="/applications/new">here</Link>.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {applications.map((app) => (
        // the key: It gives each card a permanent, unique identifier (the application's unique id).
        <ApplicationCard key={app.id} app={app} />
      ))}
    </div>
  );
}
