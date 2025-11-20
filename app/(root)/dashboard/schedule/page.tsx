import ScheduledJobsDashboard from '@/components/Layout/Dashboard/schedule/SchedulesRenderer';
import { getScheduledJobs } from '@/lib/db/content';

export default async function page(){
  const schedules = await getScheduledJobs();

  console.log(schedules);
  return <ScheduledJobsDashboard schedules={schedules}/>
}