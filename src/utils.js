export const updateFormStatus = function(model, id, element) {
  const idx = model.findIndex(item => item._id === id);
  if (idx !== -1) {
    model[idx] = element;
  }
  
  return model;
}
