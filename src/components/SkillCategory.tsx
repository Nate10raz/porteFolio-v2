import Tag from "@/components/Tag";

export default function SkillCategory({
                                          icon,
                                          title,
                                          skills,
                                      }: {
    icon: string;
    title: string;
    skills: string[];
}) {
    return (
        <div
            className="
        group relative h-full overflow-hidden rounded-[20px] border-2 border-forest
        bg-[rgba(11,50,56,0.4)] p-10
        transition-all duration-[400ms] ease-in-out
        hover:-translate-y-2.5 hover:border-accent
        hover:shadow-[0_20px_50px_rgba(44,93,102,0.2)]
        before:absolute before:inset-0 before:content-['']
        before:bg-linear-to-br before:from-[rgba(93,211,158,0.05)] before:to-transparent
        before:opacity-0 before:transition-opacity before:duration-[400ms]
        group-hover:before:opacity-100
      "
        >
            <div
                className="
          mb-6 flex h-[70px] w-[70px] items-center justify-center
          rounded-[15px] border-2 border-mist
          bg-linear-to-br from-forest to-deep
          transition-all duration-300
          group-hover:rotate-[5deg] group-hover:scale-110
        "
            >
                <i className={`${icon} text-[2rem] text-accent`}></i>
            </div>

            <h3 className="mb-6 font-sans text-[1.3rem] font-semibold text-fog">
                {title}
            </h3>

            <div className="flex flex-wrap gap-[0.8rem]">
                {skills.map((skill) => (
                    <Tag
                        key={skill}
                        name={skill}
                        className="
              rounded-full border border-forest bg-[rgba(44,93,102,0.5)]
              px-4 py-2 font-sans text-[0.9rem] text-text-light
              transition-all duration-300
              hover:-translate-y-0.5 hover:border-accent hover:bg-[rgba(44,93,102,0.8)]
              hover:text-fog hover:shadow-[0_0_12px_rgba(93,211,158,0.35),0_4px_15px_rgba(0,0,0,0.2)]
              hover:[text-shadow:0_0_8px_rgba(93,211,158,0.4)]
            "
                    />
                ))}
            </div>
        </div>
    );
}