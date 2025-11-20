import ScheduledJobsDashboard from '@/components/Layout/Dashboard/schedule/SchedulesRenderer';
import { getScheduledJobs } from '@/lib/db/content';

export default async function page(){

  return <ScheduledJobsDashboard/>
}