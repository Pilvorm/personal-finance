"use client";

import { useState, useEffect, useMemo } from "react";
import Modal from "./modal";
import DropdownInput from "../dropdowns/dropdownInput";
import { THEMES, THEMES_MAP, EXCLUDED_THEMES } from "@/app/data";
import { useCreatePotMutation, useUpdatePotMutation } from "@/app/lib/mutations/usePotMutation";

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

  const createPot = useCreatePotMutation({
    setIsOpen,
  });

  const updatePot = useUpdatePotMutation({
    editData,
    setIsOpen,
  });

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
        <div>
          <label className="mb-1 text-xs text-grey-500 font-bold">
            Pot Name
          </label>
          <div className="btn-basic px-5 py-3 flex items-center gap-3">
            <input
              name="name"
              type="text"
              value={potName}
              onChange={(e) => setPotName(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 text-xs text-grey-500 font-bold">Target</label>
          <div className="btn-basic px-5 py-3 flex items-center gap-3">
            <span className="text-sm text-beige-500">$</span>
            <input
              name="budget"
              type="number"
              min="0"
              max="1000000"
              step="0.01"
              value={potTarget}
              onChange={(e) => setPotTarget(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>

        <DropdownInput
          type="theme"
          label="Theme"
          value={selectedTheme}
          setValue={setSelectedTheme}
          options={availableThemes}
        />
      </div>

      <button
        type="submit"
        disabled={!potName || !potTarget || !selectedTheme}
        onClick={() =>
          savePot.mutate({
            name: potName,
            target: potTarget,
            theme: selectedTheme.id,
          })
        }
        className="submit-btn"
      >
        {isEdit ? "Save Changes" : "Add Pot"}
      </button>
    </Modal>
  );
}
