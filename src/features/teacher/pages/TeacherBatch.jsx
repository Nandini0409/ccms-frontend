import { useTeacherBatches } from "../hooks/useTeacherBatches"
import BatchCard from "../../../components/ui/BatchCard"
import Section from "../../../components/ui/Section"

export default function TeacherBatch() {
  const { batches, loading, error } = useTeacherBatches()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl pt-3 px-2 font-semibold text-[var(--text-main)]">
        Batches
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && batches.length === 0 && (
        <Section title="My Batches">
          <p>No batches assigned to you yet.</p>
        </Section>
      )}

      {!loading && !error && batches.length > 0 && (
        <Section title="My Batches">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {batches.map(batch => (
              <BatchCard
                key={batch.batch_id}
                id={batch.batch_id}
                name={batch.name}
                course={batch.course}
                schedule={batch.schedule}
                actionLabel="Take Attendance"
                actionTo={`/teacher/batches/attendance/${batch.batch_id}`}
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}
