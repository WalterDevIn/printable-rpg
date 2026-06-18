export const spellCardFlowRegions = {
  templateFamily: "spellCard",

  fixed: [
    {
      id: "title",
      fields: ["name", "level", "school"],
    },
    {
      id: "metadata",
      fields: ["castingTime", "range", "components", "duration"],
    },
  ],

  flow: [
    {
      id: "description",
      field: "description",
      splitBy: "paragraph",
      continuationVariantId: "flow",
      estimatedCapacity: {
        unit: "char",
        head: 420,
        continuation: 720,
      },
    },
  ],

  tail: [
    {
      id: "higherLevels",
      field: "higherLevels",
    },
  ],

  decoration: [
    {
      id: "bottomSchoolMark",
    },
  ],
};
