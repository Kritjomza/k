const tags = ['React','NodeJS','Python','AI','IoT','3D','UI/UX','Machine Learning','Arduino','Django','AR/VR','Mobile Dev']

export default function TagChips(){
  return (
    <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
      {tags.map(t=>(
        <span key={t} className="badge">{t}</span>
      ))}
    </div>
  )
}
