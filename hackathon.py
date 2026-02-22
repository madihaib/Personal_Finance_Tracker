import streamlit as st
import pandas as pd
from datetime import datetime

st.set_page_config(page_title="International Student Budget", page_icon="💱", layout="wide")
st.title("💱 International Student Budget + Parent Send Calculator")
st.caption("Build a budget in the student's currency and compute how much a parent should send in their home currency.")

FX_RATES = {
    "USD": 1.0,
    "EUR": 0.92,
    "GBP": 0.79,
    "PHP": 56.10,
    "INR": 83.20,
    "MXN": 17.20,
    "CAD": 1.34,
}

CURRENCIES = ["USD", "EUR", "GBP", "PHP", "INR", "MXN", "CAD"]

def get_rate(frm: str, to: str):
    """Return rate such that: amount_in_to = amount_in_frm * rate"""
    frm = frm.strip().upper()
    to = to.strip().upper()

    if frm not in FX_RATES or to not in FX_RATES:
        return None
    if frm == to:
        return 1.0

    return FX_RATES[to] / FX_RATES[frm]

def fee_amount_home(converted_home: float, pct_fee: float, flat_fee_home: float):
    """Simple fee model in HOME currency."""
    return converted_home * pct_fee + flat_fee_home

def compute_send_recommendation(monthly_total_study: float, rate_study_to_home: float, buffer_pct: float, pct_fee: float, flat_fee_home: float):
    """
    monthly_total_study: total budget in study currency
    rate_study_to_home: convert study -> home
    buffer_pct: e.g. 0.05
    pct_fee: e.g. 0.02
    flat_fee_home: flat fee in home currency
    """
    converted_home = monthly_total_study * rate_study_to_home
    buffer_home = converted_home * buffer_pct
    fees_home = fee_amount_home(converted_home, pct_fee, flat_fee_home)
    recommended_send_home = converted_home + buffer_home + fees_home

    return {
        "converted_home": converted_home,
        "buffer_home": buffer_home,
        "fees_home": fees_home,
        "recommended_send_home": recommended_send_home,
    }

def fmt(x: float, ccy: str):
    return f"{ccy} {x:,.2f}"

DEFAULT_CATEGORIES = [
    "Rent", "Utilities", "Food", "Transportation", "Phone/Internet",
    "Insurance/Medical", "School Supplies", "Entertainment", "Misc"
]

if "budget_df" not in st.session_state:
    st.session_state.budget_df = pd.DataFrame(
        [{"category": c, "description": "", "monthly_amount": 0.0} for c in DEFAULT_CATEGORIES]
    )

if "student_currency" not in st.session_state:
    st.session_state.student_currency = "USD"
if "parent_currency" not in st.session_state:
    st.session_state.parent_currency = "USD"


tab1, tab2 = st.tabs(["💸 Budget", "🌍 Currency Exchange"])

with tab1:
    st.subheader("Monthly Budget Builder")

    left, right = st.columns([2, 1], vertical_alignment="top")

    with left:
        st.write("Edit your monthly budget items (student spending currency).")
        st.session_state.student_currency = st.selectbox(
            "Student spending currency (study currency)",
            CURRENCIES,
            index=CURRENCIES.index(st.session_state.student_currency),
            key="student_currency_select_budget"
        )

        edited = st.data_editor(
            st.session_state.budget_df,
            use_container_width=True,
            num_rows="dynamic",
            column_config={
                "category": st.column_config.TextColumn("Category"),
                "description": st.column_config.TextColumn("Description (optional)"),
                "monthly_amount": st.column_config.NumberColumn(
                    f"Monthly amount ({st.session_state.student_currency})",
                    min_value=0.0,
                    step=10.0
                ),
            },
            key="budget_editor_full"
        )
        st.session_state.budget_df = edited.copy()

    with right:
        df = st.session_state.budget_df.copy()
        df["monthly_amount"] = df["monthly_amount"].fillna(0.0)
        monthly_total = float(df["monthly_amount"].sum())

        st.metric("Monthly total", fmt(monthly_total, st.session_state.student_currency))
        st.metric("Weekly (approx.)", fmt(monthly_total / 4.0, st.session_state.student_currency))
        st.metric("Biweekly (approx.)", fmt(monthly_total / 2.0, st.session_state.student_currency))

        st.write("Category breakdown")
        bd = df.groupby("category", as_index=False)["monthly_amount"].sum().sort_values("monthly_amount", ascending=False)
        st.dataframe(bd, use_container_width=True, height=260)

    st.divider()
    st.subheader("Chart")
    chart_df = st.session_state.budget_df.copy()
    chart_df["monthly_amount"] = chart_df["monthly_amount"].fillna(0.0)
    chart_df = chart_df.groupby("category", as_index=False)["monthly_amount"].sum().sort_values("monthly_amount", ascending=False)
    st.bar_chart(chart_df.set_index("category")["monthly_amount"])

    st.divider()
    st.subheader("Export")
    export_budget = st.session_state.budget_df.copy()
    export_budget["monthly_amount"] = export_budget["monthly_amount"].fillna(0.0)

    st.download_button(
        "Download Budget Items (CSV)",
        data=export_budget.to_csv(index=False).encode("utf-8"),
        file_name="budget_items.csv",
        mime="text/csv",
        use_container_width=True
    )

# -----------------------------
# TAB 2: Currency + Parent Send Calculator
# -----------------------------
with tab2:
    st.subheader("Allowance / Parent Send Calculator")
    st.write("Convert the student's budget into the parent's home currency and include buffer + transfer fees.")

    # Top controls
    c1, c2, c3 = st.columns(3)

    with c1:
        parent_currency = st.selectbox(
            "Parent currency (home currency)",
            CURRENCIES,
            index=CURRENCIES.index(st.session_state.parent_currency),
            key="parent_currency_select_fx"
        )
        st.session_state.parent_currency = parent_currency

    with c2:
        # Student currency uses whatever was set on budget tab, but allow override here too
        student_currency_fx = st.selectbox(
            "Student currency (study currency)",
            CURRENCIES,
            index=CURRENCIES.index(st.session_state.student_currency),
            key="student_currency_select_fx"
        )
        st.session_state.student_currency = student_currency_fx

    with c3:
        buffer_pct = st.slider("Buffer (%)", 0, 15, 5, 1, help="Extra margin for FX swings & surprises") / 100.0

    # Fees in parent/home currency
    f1, f2, f3 = st.columns(3)
    with f1:
        pct_fee = st.number_input("Percent fee (%)", min_value=0.0, value=0.0, step=0.25) / 100.0
    with f2:
        flat_fee_home = st.number_input(f"Flat fee ({parent_currency})", min_value=0.0, value=0.0, step=1.0)
    with f3:
        cadence = st.selectbox("Send cadence", ["Monthly", "Biweekly", "Weekly"], index=0)

    # Compute totals based on budget tab
    df = st.session_state.budget_df.copy()
    df["monthly_amount"] = df["monthly_amount"].fillna(0.0)
    monthly_total = float(df["monthly_amount"].sum())

    rate = get_rate(st.session_state.student_currency, st.session_state.parent_currency)

    st.divider()

    # Results area
    if rate is None:
        st.error("Could not fetch exchange rate (currency not supported in FX_RATES).")
    else:
        st.caption(f"Offline demo rates (USD-based). Last updated: {datetime.now().strftime('%Y-%m-%d')} (demo)")
        st.write(f"**Current rate:** 1 {st.session_state.student_currency} = {rate:.4f} {st.session_state.parent_currency}")

        # Choose cadence conversion
        if cadence == "Monthly":
            base_study = monthly_total
        elif cadence == "Biweekly":
            base_study = monthly_total / 2.0
        else:  # Weekly
            base_study = monthly_total / 4.0

        result = compute_send_recommendation(
            monthly_total_study=base_study,
            rate_study_to_home=rate,
            buffer_pct=buffer_pct,
            pct_fee=pct_fee,
            flat_fee_home=flat_fee_home
        )

        r1, r2, r3, r4 = st.columns(4)
        r1.metric(f"{cadence} total (student)", fmt(base_study, st.session_state.student_currency))
        r2.metric("Converted (parent)", fmt(result["converted_home"], st.session_state.parent_currency))
        r3.metric(f"Buffer ({int(buffer_pct*100)}%)", fmt(result["buffer_home"], st.session_state.parent_currency))
        r4.metric("✅ Recommended send", fmt(result["recommended_send_home"], st.session_state.parent_currency))

        st.info(
            f"Fees model: {pct_fee*100:.2f}% + {fmt(flat_fee_home, st.session_state.parent_currency)} "
            f"(applied on converted amount)."
        )

        # Breakdown table
        breakdown = pd.DataFrame([
            {"Line": f"{cadence} total (student)", "Amount": fmt(base_study, st.session_state.student_currency)},
            {"Line": "Converted total (parent)", "Amount": fmt(result["converted_home"], st.session_state.parent_currency)},
            {"Line": f"Buffer ({int(buffer_pct*100)}%)", "Amount": fmt(result["buffer_home"], st.session_state.parent_currency)},
            {"Line": "Fees (parent)", "Amount": fmt(result["fees_home"], st.session_state.parent_currency)},
            {"Line": "Recommended send (parent)", "Amount": fmt(result["recommended_send_home"], st.session_state.parent_currency)},
        ])
        st.dataframe(breakdown, use_container_width=True, hide_index=True)

        # Export summary
        st.subheader("Export")
        summary_rows = [
            {"metric": "student_currency", "value": st.session_state.student_currency},
            {"metric": "parent_currency", "value": st.session_state.parent_currency},
            {"metric": "cadence", "value": cadence},
            {"metric": "student_total", "value": base_study},
            {"metric": "fx_rate", "value": rate},
            {"metric": "converted_parent", "value": result["converted_home"]},
            {"metric": "buffer_pct", "value": buffer_pct},
            {"metric": "buffer_parent", "value": result["buffer_home"]},
            {"metric": "pct_fee", "value": pct_fee},
            {"metric": "flat_fee_parent", "value": flat_fee_home},
            {"metric": "fees_parent", "value": result["fees_home"]},
            {"metric": "recommended_send_parent", "value": result["recommended_send_home"]},
        ]
        export_summary = pd.DataFrame(summary_rows)

        st.download_button(
            "Download Summary (CSV)",
            data=export_summary.to_csv(index=False).encode("utf-8"),
            file_name="budget_send_summary.csv",
            mime="text/csv",
            use_container_width=True
        )

st.caption("Note: Exchange rates are fixed demo values for hackathon reliability (no API).")