interface Props {
  label: string
  onClick: () => void
}

export default function AddProfessorNode({ label, onClick }: Props) {
  return (
    <button
        type="button"
      onClick={onClick}
      class="
        group
        w-16 h-16
        rounded-full
        flex items-center justify-center
        bg-green-500
        hover:bg-green-600
        transition
        shadow-md
      "
      title={label}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 5v14M5 12h14"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    </button>
  )
}
