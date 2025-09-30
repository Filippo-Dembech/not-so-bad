interface DotButtonProps {
  onClick: () => void,
  className: string
}

export const DotButton = ({ onClick, className}: DotButtonProps) => {
  return (
    <button type="button" onClick={onClick} className={className}></button>
  )
}
