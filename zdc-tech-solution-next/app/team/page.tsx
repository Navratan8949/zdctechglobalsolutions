"use client";

import { useEffect, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { TeamCard } from "@/components/site/TeamCard";
import { team as fallbackTeam, type TeamMember } from "@/data/team";
import { getTeamMembers } from "@/service/team.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(fallbackTeam);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadTeam = async () => {
      try {
        const response = await getTeamMembers();
        if (!active) return;
        const liveMembers = unwrapApiResponse<TeamMember[]>(response) || [];
        if (liveMembers.length) setMembers(liveMembers);
      } catch (requestError) {
        if (!active) return;
        setError(getApiErrorMessage(requestError));
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadTeam();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Meet the People Behind the Code"
        description="A diverse team of passionate professionals united by a love for technology and a commitment to excellence."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Loading our team...
            </p>
          )}
          {error && (
            <p className="mb-8 text-center text-sm text-amber-300">{error}</p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to Join Our Team?"
        description="We are always looking for talented people who share our passion for technology and quality."
        primaryLabel="View Open Positions"
        primaryHref="/careers"
      />
    </>
  );
}
