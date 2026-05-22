import styles from "./AppSkeleton.module.css";

export const AppSkeleton = () => {
  return (
    <div className={styles.app}>
      <section className={styles.hero}>
        <div className={styles.avatarSkeleton}></div>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.textSkeleton}></div>
        <div className={styles.textSkeletonShort}></div>
        <div className={styles.textSkeletonMedium}></div>
        <div className={styles.socialSkeleton}>
          <div className={styles.socialIcon}></div>
          <div className={styles.socialIcon}></div>
        </div>
      </section>

      <div className={styles.aiAssistantSkeleton}>
        <div className={styles.chatHeaderSkeleton}></div>
        <div className={styles.messagesSkeleton}></div>
        <div className={styles.promptSkeleton}></div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitleSkeleton}></h2>
        <div className={styles.stackSkeleton}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={styles.stackItemSkeleton}></div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitleSkeleton}></h2>
        <div className={styles.projectsSkeleton}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.projectCardSkeleton}>
              <div className={styles.projectTitleSkeleton}></div>
              <div className={styles.projectTextSkeleton}></div>
              <div className={styles.projectTextSkeletonShort}></div>
              <div className={styles.tagsSkeleton}>
                <div className={styles.tagSkeleton}></div>
                <div className={styles.tagSkeleton}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitleSkeleton}></h2>
        <div className={styles.cardsSkeleton}>
          <div className={styles.cardSkeleton}>
            <div className={styles.cardTitleSkeleton}></div>
            <div className={styles.cardListSkeleton}>
              <div className={styles.listItemSkeleton}></div>
              <div className={styles.listItemSkeleton}></div>
              <div className={styles.listItemSkeletonShort}></div>
            </div>
          </div>
          <div className={styles.cardSkeleton}>
            <div className={styles.cardTitleSkeleton}></div>
            <div className={styles.cardListSkeleton}>
              <div className={styles.listItemSkeleton}></div>
              <div className={styles.listItemSkeleton}></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitleSkeleton}></h2>
        <div className={styles.formSkeleton}>
          <div className={styles.inputSkeleton}></div>
          <div className={styles.inputSkeleton}></div>
          <div className={styles.textareaSkeleton}></div>
          <div className={styles.buttonSkeleton}></div>
        </div>
      </section>
    </div>
  );
};
