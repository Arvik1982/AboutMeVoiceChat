import styles from "./App.module.css";
import { Hero } from "./components/Hero/Hero";
import { TechStack } from "./components/TechStack/TechStack";
import { Projects } from "./components/Projects/Projects";
import { Approach } from "./components/Approach/Approach";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { LoadingDots } from "./components/LoadingDots/LoadingDots";
import { useProfile } from "./hooks/useProfile";
import AiAssistant from "./components/AiAssistant/AiAssistant";

function App() {
  const {
    profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfile();

  if (isProfileLoading) {
    return (
      <div className={styles.app_load}>
        <LoadingDots />
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className={styles.app}>
        <div className={styles.error}>
          Failed to load profile data. Please refresh the page.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Hero
        name={profile.hero.name}
        title={profile.hero.title}
        experience={profile.hero.experience}
        description={profile.hero.description}
        avatar={profile.hero.avatar}
        social={profile.social}
      />

      <AiAssistant />

      <TechStack items={profile.techStack} />

      <Projects projects={profile.projects} />

      <Approach
        development={profile.approach.development}
        aiTools={profile.approach.aiTools}
      />

      <section className={styles.section}>
        <h2>Связаться со мной</h2>
        <ContactForm />
      </section>
    </div>
  );
}

export default App;
