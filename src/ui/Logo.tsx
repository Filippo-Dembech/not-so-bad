export default function Logo() {
    return (
        <img
            src={`${import.meta.env.BASE_URL}/not-so-bad-icon.svg`}
            alt="icon"
            width={100}
            style={{ display: "block", margin: "0 auto" }}
        />
    )
}