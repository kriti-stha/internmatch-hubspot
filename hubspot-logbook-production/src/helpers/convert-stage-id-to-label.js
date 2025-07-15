const convertStageIdToLabel = (pipelineStages) => {
  return Array.isArray(pipelineStages)
    ? pipelineStages.reduce((acc, stage) => {
        acc[stage.id] = stage.label;
        return acc;
      }, {})
    : {};
};

export default convertStageIdToLabel;
