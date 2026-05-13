"use client";

import { useState, useEffect, useMemo } from "react";
import Modal from "./modal";
import Input from "../input";
import ButtonLoader from "../buttonLoader";
import DropdownInput from "../dropdowns/dropdownInput";

import {
  useCreatePotMutation,
  useUpdatePotMutation,
} from "@/app/lib/mutations/usePotMutation";
import { THEMES, THEMES_MAP, EXCLUDED_THEMES } from "@/app/data";

export default function PotModal({
  setIsOpen,
  usedThemes = new Set(),
  editData = null,
}) {
  const [potName, setPotName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [potTarget, setPotTarget] = useState("");

  const isEdit = !!editData;

  const availableThemes = useMemo(
    () =>
      THEMES.filter(
        (t) =>
          !EXCLUDED_THEMES.has(t.id) &&
          (!usedThemes.has(t.id) || t.id === editData?.theme),
      ),
    [usedThemes, editData],
  );

  useEffect(() => {
    if (!isEdit && availableThemes.length && !selectedTheme) {
      setSelectedTheme(availableThemes[0]);
    }
  }, [availableThemes, selectedTheme, isEdit]);

  // Prefill form fields when editing
  useEffect(() => {
    if (editData) {
      const foundTheme = editData.theme
        ? {
            id: editData.theme,
            ...THEMES_MAP[editData.theme],
          }
        : null;

      setPotName(editData.name);
      setSelectedTheme(foundTheme || null);
      setPotTarget(editData.target);
    }
  }, [editData]);

  const [errors, setErrors] = useState({});

  const createPot = useCreatePotMutation({ setIsOpen });
  const updatePot = useUpdatePotMutation({ editData, setIsOpen });
  const savePot = isEdit ? updatePot : createPot;

  return (
    <Modal
      title={isEdit ? "Edit Pot" : "Add New Pot"}
      description={
        isEdit
          ? "If your saving targets change, feel free to update your pots."
          : "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
      }
      setIsOpen={setIsOpen}
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Pot Name"
          type="text"
          value={potName}
          onChange={(e) => {
            setPotName(e.target.value);
            setErrors((prev) => ({ ...prev, potName: "" }));
          }}
          error={errors.potName}
        />

        <Input
          label="Target"
          icon="$"
          type="number"
          value={potTarget}
          min="0.01"
          max="1000000"
          step="0.01"
          onChange={(e) => {
            setPotTarget(e.target.value);
            setErrors((prev) => ({ ...prev, budget: "" }));
          }}
          error={errors.potTarget}
        />

        <DropdownInput
          type="theme"
          label="Theme"
          value={selectedTheme}
          setValue={setSelectedTheme}
          options={availableThemes}
        />
      </div>

      <button
        disabled={savePot.isPending}
        onClick={() => {
          const newErrors = {};

          if (!potName || potName.trim() === "") {
            newErrors.potName = "Pot name is required";
          }

          if (!potTarget || Number(potTarget) <= 0) {
            newErrors.potTarget = "Pot target is required";
          }

          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
          }

          setErrors({});
          savePot.mutate({
            name: potName,
            target: potTarget,
            theme: selectedTheme.id,
          });
        }}
        className="submit-btn"
      >
        <ButtonLoader
          isPending={savePot.isPending}
          label={isEdit ? "Save Changes" : "Add Pot"}
        />
      </button>
    </Modal>
  );
}
