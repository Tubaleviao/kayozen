import { useTranslationContext } from "./TranslationContext.tsx"

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NewProfessorModal({ open, onClose }: Props) {
  const { t } = useTranslationContext()

  if (!open) return null;

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        class="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 class="mb-4 text-lg font-semibold text-gray-800">
          {t("dashboard.modal.new_professor")}
        </h2>

        <form
          class="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();

            const form = e.currentTarget;
            const data = new FormData(form);

            console.log({
              name: data.get("name"),
              email: data.get("email"),
              subject: data.get("subject"),
            });

          }}
        >
          <input
            name="name"
            required
            placeholder={t("dashboard.modal.name")}
            class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="email"
            type="email"
            placeholder={t("dashboard.modal.optional_email")}
            class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="subject"
            placeholder="Disciplina"
            class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div class="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              class="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              {t("dashboard.modal.cancel")}
            </button>

            <button
              type="submit"
              class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {t("dashboard.modal.create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
