import { useStudentBatches } from "../hooks/useStudentBatches"
import Section from "../../../components/ui/Section"
import BatchCard from "../../../components/ui/BatchCard"

export default function StudentBatch() {
  const { batches, loading, error } = useStudentBatches()

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <Section title="My Batches">
      {batches.length === 0 ? (
        <p>You are not enrolled in any batches yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map(batch => (
            <BatchCard
              key={batch.batch_id}
              id={batch.batch_id}
              name={batch.name}
              course={batch.course}
              schedule={batch.schedule}
              actionLabel="View details"
              actionTo={`/student/batch/${batch.batch_id}`}
            />
          ))}
        </div>
      )}
    </Section>
  )
}
