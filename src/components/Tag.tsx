export default function Tag({ name , className }: { name: string ,className:string }) {
    return <span className={className}>{name}</span>;
}